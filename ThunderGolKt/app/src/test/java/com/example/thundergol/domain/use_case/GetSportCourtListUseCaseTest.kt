package com.example.thundergol.domain.use_case

import com.example.thundergol.domain.model.SportCourtModel
import com.example.thundergol.domain.repository.SportCourtRepositoryInterface
import com.example.thundergol.presentation.sportscourts.SportCourtDetail
import io.mockk.MockKAnnotations
import io.mockk.coEvery
import io.mockk.impl.annotations.RelaxedMockK
import kotlinx.coroutines.*
import kotlinx.coroutines.flow.*
import kotlinx.coroutines.test.runTest
import org.junit.Assert
import org.junit.Before
import org.junit.Test


internal class GetSportCourtListUseCaseTest {

    @RelaxedMockK
    private lateinit var sportCourtRepository : SportCourtRepositoryInterface

    lateinit var getSportCourtListUseCase: GetSportCourtListUseCase
    @Before
    fun setUp() {
        MockKAnnotations.init(this)
        getSportCourtListUseCase = GetSportCourtListUseCase(sportCourtRepository)
    }
    private suspend fun createDeferredSportCourtDetail(model: SportCourtModel): SportCourtDetail {
        // Simulate some asynchronous operation
        delay(1000)
        return SportCourtDetail(
            id = "fwefwefwe",
            width = 12,
            price = 14,
            sportCenterId = "dfgdshhghfj",
            name = "C1",
            photo = "qqqqqqqqqq",
            materialId = "qweggfdsvhrhreh234",
            long = 35,
            description = "des1",
            materialName= "",
            sportCenterName = "",
        )
    }

    @Test
    fun `when the repository return something get values`() = runTest {
        //given
        val expected = listOf(
            async {
                createDeferredSportCourtDetail(
                    SportCourtModel(
                        id = "fwefwefwe",
                        width = 12,
                        price = 14,
                        sportCenterId = "dfgdshhghfj",
                        name = "C1",
                        photo = "qqqqqqqqqq",
                        materialId = "qweggfdsvhrhreh234",
                        long = 35,
                        description = "des1"
                    )
                )
          },
            async {
                createDeferredSportCourtDetail(
                    SportCourtModel(
                        id = "gergerger",
                        width = 14,
                        price = 85,
                        sportCenterId = "qwriliñoilkjnh",
                        name = "C2",
                        photo = "wwwwwwwwwwwwwwww",
                        materialId = "e12er4g5g45h",
                        long = 32,
                        description = "des2",
                    )
                )
            },
            async {
                createDeferredSportCourtDetail(
                    SportCourtModel(
                        id = "peogpowrop",
                        width = 14,
                        price = 85,
                        sportCenterId = "opwrvpowigpowei",
                        name = "C2",
                        photo = "iiiiiiiiiiiiiiii",
                        materialId = "xocupwoejfef2",
                        long = 32,
                        description = "des3",
                    )
                )
            }
        )

        //when
        coEvery { sportCourtRepository.fetchListSportCourt() } returns flowOf(expected)

        //expect
        getSportCourtListUseCase().collect{
            Assert.assertEquals(expected.size, it.size)
        }


    }
}
